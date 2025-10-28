# Contributing to MERN Ecommerce

Thank you for considering contributing to this project! This document provides guidelines for contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested in Issues
2. Create a new issue with:
   - Clear description of the feature
   - Why it would be useful
   - Example use cases

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages (`git commit -m 'Add feature: description'`)
6. Push to your fork (`git push origin feature/your-feature-name`)
7. Open a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/videos if UI changes

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add comments for complex logic
- Use meaningful variable and function names

### Backend Development

- Use async/await for asynchronous operations
- Handle errors appropriately
- Validate user inputs
- Write middleware for reusable logic
- Follow RESTful API conventions

### Frontend Development

- Use functional components with hooks
- Keep components focused and reusable
- Handle loading and error states
- Use meaningful component names
- Follow React best practices

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Be concise but descriptive
- Reference issues when applicable (#123)

### Testing

- Test new features thoroughly
- Test edge cases
- Ensure existing functionality still works
- Test on different browsers (for frontend changes)

## Project Structure

```
backend/
  ├── config/      # Database and configuration
  ├── controllers/ # Route handlers
  ├── middleware/  # Custom middleware
  ├── models/      # Database models
  └── routes/      # API routes

frontend/
  ├── src/
      ├── components/ # Reusable components
      ├── context/    # State management
      ├── pages/      # Page components
      └── utils/      # Helper functions
```

## Getting Help

- Check the README for setup instructions
- Search existing issues
- Create a new issue if needed

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Focus on what's best for the project

Thank you for contributing! 🎉
