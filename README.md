# Nestoras TODO Repository

This repository contains strategic product documentation and deployable React applications for innovation projects.

## 📁 Repository Structure

```
├── docs/                    # Product whitepapers & documentation
│   ├── CV_Clinic.md
│   ├── HARMONIA_Social_Medicine_Platform_Proposal.md
│   └── README.md
│
├── apps/                    # Independently deployable React applications
│   └── cvin-demo-jsx/            # CVin Platform Demo
│       ├── public/
│       ├── src/
│       ├── package.json
│       ├── .gitignore
│       └── README.md
│
└── README.md                # This file
```

## 📚 Documentation

All product proposals and technical documentation are located in `/docs/`:
- **CV_Clinic.md** - Youth employment platform with impact-based rewards
- **HARMONIA_Social_Medicine_Platform_Proposal.md** - Music-based loneliness mitigation platform

## 🚀 Applications

### CVin JSX Demo (`apps/cvin-demo-jsx`)

An interactive React demonstration of the CVin platform showcasing:
- Social feed with career achievements
- CV review and feedback system
- Personal progress tracking
- Mentor impact portfolio
- Review queue management
- Organization dashboard
- Community recognition wall

**Local Development:**
```bash
cd apps/cvin-demo-jsx
npm install
npm start
```

**Deploy to Vercel:**
1. Connect repo to Vercel
2. Set root directory to `apps/cvin-demo-jsx`
3. Deploy

## 🛠️ Adding New Projects

To add a new React application:

1. Create `/apps/project-name/` directory
2. Copy the structure from `/apps/cvin-demo-jsx/`
3. Update `package.json` with your project name and dependencies
4. Replace `src/App.jsx` with your component
5. Configure Vercel to deploy from `/apps/project-name/`

## 📋 Project Ideas

- **CV_Clinic** - Full platform implementation for youth employment
- **HARMONIA** - Music-based social platform with matching engine

## 🔗 Resources

- [Vercel Monorepo Deployment](https://vercel.com/docs/concepts/monorepos/introduction)
- [React Documentation](https://react.dev)
- [Create React App](https://create-react-app.dev)

## 📝 License

Private repository
