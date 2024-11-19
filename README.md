# Vernier Caliper Simulation

An interactive web-based simulation tool for learning and practicing vernier caliper measurements. This open-source project aims to help students understand and master the use of vernier calipers through hands-on virtual practice.

## About the Project

This project is developed by Shanilka Ariyarathne as part of an initiative to create interactive STEM learning tools. The focus is on making scientific education more accessible and engaging through web-based simulations.

### Key Features

- Interactive vernier caliper simulation
- Multiple scale configurations (100mm, 200mm, 300mm)
- Adjustable vernier divisions (10, 20, 25, 40, 50)
- Practice mode with auto-generated questions
- Real-time measurement feedback
- Mobile-responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Visual Studio Code (recommended)

### Installation

1. Clone the repository

```bash
git clone https://github.com/Aklinahs/vernier-caliper-sim.git
cd vernier-caliper-sim
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
vernier-caliper-sim/
├── public/
│   └── assets/
│       └── caliper/           # Caliper image assets
├── src/
│   ├── components/           # Common components
│   ├── features/            # Feature modules
│   │   ├── simulator/       # Main simulation feature
│   │   └── practice/       # Practice test feature
│   └── routes/             # Application routing
```

## Technology Stack

- React 18.x
- TypeScript
- Tailwind CSS
- Vite
- GitHub Pages (deployment)

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components
- Maintain component isolation
- Document props and interfaces
- Consider accessibility
- Test across different devices

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Shanilka Ariyarathne - [GitHub Profile](https://github.com/Aklinahs)

Project Link: [https://github.com/Aklinahs/vernier-caliper-sim](https://github.com/Aklinahs/vernier-caliper-sim)

## Acknowledgments

Special thanks to:

- The STEM education community
- Open source contributors
- Science educators providing feedback

## Future Development

Planned features include:

- Enhanced tutorial system
- Additional measurement tools
- Performance analytics
- Expanded practice exercises
- Mobile touch optimization
