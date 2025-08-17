#  STUN Video Call Application

WebRTC IM based on Nodejs + socket.io + express.suport p2p group mode video call and message,stands for Web Real-Time Communications  exchange connection data in the form of SDP objects but never touches the data itself, that is actually transmitted between the peers themselves via STUN and TURN servers

### Core Functionality
- Real-time video/audio communication using WebRTC mesh
- Peer-to-peer architecture for direct communication
- Support for multiple participants (optimal for 6-8 people)
- No registration or downloads required
- Works across all major web browsers

### Key Features
- Real-time text chat during calls
- Screen sharing capability
- Device selection (camera/microphone)
- Audio/video mute controls
- Fullscreen mode
- Room-based communication
- Automatic room creation with unique IDs
- Copy invite link functionality
- Mobile responsive design

### Technical Features
- Encrypted peer-to-peer communication
- WebRTC mesh topology
- STUN/TURN server support
- Real-time signaling server
- Data channel for chat messages
- Adaptive video layout

## Technology Stack

### Frontend
- WebRTC - Real-time communication
- Socket.IO - Client-side real-time communication
- CSS3 - Styling and responsive design
- HTML5 - Web structure and media elements

### Backend
- Node.js - Server runtime
- Express - Web framework
- Socket.IO - Server-side real-time communication
- WebRTC signaling server

### Infrastructure
- STUN/TURN servers for NAT traversal
- Peer-to-peer mesh network
- Docker support for containerization

## Prerequisites
- Node.js 8.x or above
- NPM (Node Package Manager)

## Installation

1. Clone the repository:


2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

The application will be running at http://localhost:3000

## Docker Support

You can also run the application using Docker:

```bash
docker-compose up
```

## Technical Architecture

### WebRTC Implementation
- Uses WebRTC mesh topology for peer-to-peer connections
- Implements ICE (Interactive Connectivity Establishment) protocol
- Supports both STUN and TURN servers for NAT traversal
- Uses data channels for text chat functionality

### Signaling Server
- Handles peer discovery and connection establishment
- Manages room creation and participant coordination
- Implements Socket.IO for real-time communication
- Facilitates ICE candidate exchange

### Security Features
- Peer-to-peer encrypted communication
- No data storage on servers
- Temporary room-based connections
- Secure WebRTC protocols

## Browser Support
- Chrome (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Edge (Desktop)

## Performance Considerations
- Video quality adapts based on number of participants
- Optimal performance with 6-8 participants
- Mesh topology means each peer connects directly to every other peer
- Bandwidth usage increases with number of participants



