#!/bin/bash

# Enable strict error handling
set -euo pipefail

# Load environment variables
if [ -f .env ]; then
  source .env
fi

# Validate required environment variables
if [ -z "$API_BASE_URL" ]; then
  echo "ERROR: API_BASE_URL not set in .env" >&2
  exit 1
fi

# Function definitions
function log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") INFO: $*"
}

function log_error() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") ERROR: $*" >&2
}

function cleanup() {
  log_info "Cleaning up..."
  # Remove PID files (if implemented)
  rm -f /tmp/fitness-tracker-mvp.pid
  # Stop services (if implemented)
}

function check_dependencies() {
  log_info "Checking dependencies..."
  # Check if Node.js and npm are installed
  if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed"
    exit 1
  fi
  if ! command -v npm &> /dev/null; then
    log_error "npm is not installed"
    exit 1
  fi
}

function start_frontend() {
  log_info "Starting frontend service..."
  npm run dev
}

function store_pid() {
  # If PID files are implemented
  # echo $! > /tmp/fitness-tracker-mvp.pid
}

# Main execution flow
trap cleanup EXIT ERR
check_dependencies
start_frontend
store_pid
log_info "Fitness Tracker MVP started successfully."