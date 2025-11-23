#!/bin/bash

# Heart Disease App - Complete Setup Script
# This script starts all services needed for testing

echo "╔═════════════════════════════════════════════════════════╗"
echo "║   Heart Disease App - Complete Setup                   ║"
echo "╚═════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Kill any existing processes
echo -e "${YELLOW}Cleaning up existing processes...${NC}"
pkill -f "mock-api-server" 2>/dev/null || true
pkill -f "npm start" 2>/dev/null || true
sleep 1

# Start Mock API Server
echo -e "${BLUE}Starting Mock API Server...${NC}"
cd /workspaces/HeartDiseaseApp
node mock-api-server.js > /tmp/mock-api.log 2>&1 &
MOCK_PID=$!
echo -e "${GREEN}✓ Mock API Server started (PID: $MOCK_PID)${NC}"
sleep 2

# Verify Mock API is running
echo -e "${BLUE}Verifying Mock API Server...${NC}"
if curl -s http://localhost:5142/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Mock API Server is responding${NC}"
else
    echo -e "${RED}✗ Mock API Server not responding${NC}"
    cat /tmp/mock-api.log
    exit 1
fi

# Start React UI
echo -e "${BLUE}Starting React UI Server...${NC}"
cd /workspaces/HeartDiseaseApp/HeartDisease.UI/HeartDiseaseReact.UI
npm start > /tmp/react-ui.log 2>&1 &
REACT_PID=$!
echo -e "${GREEN}✓ React UI Server started (PID: $REACT_PID)${NC}"
sleep 3

echo ""
echo "╔═════════════════════════════════════════════════════════╗"
echo "║   Services Running Successfully!                        ║"
echo "╠═════════════════════════════════════════════════════════╣"
echo -e "║ ${GREEN}✓ Mock API Server${NC}        http://localhost:5142      ║"
echo -e "║ ${GREEN}✓ React UI Server${NC}       http://localhost:3000      ║"
echo "║                                                         ║"
echo "║ Open http://localhost:3000 in your browser             ║"
echo "║                                                         ║"
echo "╠═════════════════════════════════════════════════════════╣"
echo "║ Test Credentials:                                       ║"
echo "║   Email: admin@example.com                              ║"
echo "║   Password: Admin123!                                   ║"
echo "╠═════════════════════════════════════════════════════════╣"
echo "║ To stop servers:                                        ║"
echo "║   kill $MOCK_PID (Mock API)                             ║"
echo "║   kill $REACT_PID (React UI)                            ║"
echo "║   Or press Ctrl+C in each terminal                      ║"
echo "╚═════════════════════════════════════════════════════════╝"
echo ""

# Wait for user to stop the services
wait
