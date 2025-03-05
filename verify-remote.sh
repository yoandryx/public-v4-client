#!/bin/bash

set -e  # Exit on error
set -o pipefail  # Catch errors in pipes

EXPECTED_HASH=$(cat squads-public-build/hash.txt)

if [ -z "$1" ]; then
    echo "❌ Error: No URL provided."
    echo "Usage: $0 <URL>"
    exit 1
fi

REMOTE_URL="$1"

# Temporary directory for verification
VERIFY_DIR="squads-public-verify"
rm -rf "$VERIFY_DIR"
mkdir -p "$VERIFY_DIR"

# Ensure wget is installed
if ! command -v wget &> /dev/null; then
    echo "❌ Error: 'wget' is required but not installed."

    # Prompt to install wget
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "💡 Would you like to install 'wget' now? (y/n)"
        read -r INSTALL_WGET
        if [[ "$INSTALL_WGET" == "y" || "$INSTALL_WGET" == "Y" ]]; then
            if command -v apt &> /dev/null; then
                sudo apt update && sudo apt install -y wget
            elif command -v yum &> /dev/null; then
                sudo yum install -y wget
            elif command -v pacman &> /dev/null; then
                sudo pacman -S wget --noconfirm
            else
                echo "❌ Error: Package manager not detected. Please install wget manually."
                exit 1
            fi
        else
            echo "❌ wget is required. Please install it manually."
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "💡 Would you like to install 'wget' using Homebrew? (y/n)"
        read -r INSTALL_WGET
        if [[ "$INSTALL_WGET" == "y" || "$INSTALL_WGET" == "Y" ]]; then
            if command -v brew &> /dev/null; then
                brew install wget
            else
                echo "❌ Error: Homebrew is not installed. Install it from https://brew.sh/"
                exit 1
            fi
        else
            echo "❌ wget is required. Please install it manually."
            exit 1
        fi
    else
        echo "❌ Unsupported OS. Please install wget manually."
        exit 1
    fi
fi

echo "🌍 Downloading the hosted website from: $REMOTE_URL..."

# Use wget to mirror the entire static site **with all dependencies**
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent --no-clobber --span-hosts --domains=$(echo "$REMOTE_URL" | awk -F/ '{print $3}') -P "$VERIFY_DIR" "$REMOTE_URL"

# Ensure download was successful
if [ ! "$(ls -A "$VERIFY_DIR")" ]; then
    echo "❌ Error: Downloaded files not found!"
    exit 1
fi

echo "🔍 Checking for missing files..."
find "$VERIFY_DIR" -type f > downloaded_files.txt
MISSING_FILES=0

for REQUIRED_FILE in "logo.png" "bundle.js.LICENSE.txt"; do
    if ! grep -q "$REQUIRED_FILE" downloaded_files.txt; then
        echo "❌ Missing: $REQUIRED_FILE"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

if [[ "$MISSING_FILES" -gt 0 ]]; then
    echo "⚠️ Warning: Some expected files are missing. Consider checking the site structure."
fi

# Compute hash for verification
COMPUTED_HASH=$(cd "$VERIFY_DIR" && find . -type f -print0 | sort -z | xargs -0 cat | sha256sum | awk '{ print $1 }')

echo "✅ Expected Hash: $EXPECTED_HASH"
echo "🔍 Computed Hash: $COMPUTED_HASH"

# Compare hashes
if [ "$EXPECTED_HASH" == "$COMPUTED_HASH" ]; then
    echo "🎉 Build verification SUCCESSFUL! The downloaded site is authentic."
    exit 0
else
    echo "❌ Build verification FAILED! The downloaded site does not match the expected hash."
    exit 1
fi
