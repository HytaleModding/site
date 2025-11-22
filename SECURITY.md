# Security Policy

## Supported Versions

As this is a documentation website, we continuously update and maintain the current version. Security updates are applied to the main branch as soon as they are identified and resolved.

| Version | Supported          |
| ------- | ------------------ |
| Latest (main branch) | :white_check_mark: |
| Older commits | :x: |

## Reporting a Vulnerability

We take the security of the Hytale Modding Documentation site seriously. If you discover a security vulnerability, we appreciate your help in disclosing it to us responsibly.

### What to Report

Please report any of the following:

- Security vulnerabilities in the site itself
- XSS (Cross-Site Scripting) vulnerabilities
- Authentication or authorization issues
- Dependency vulnerabilities
- Any security concerns related to user data
- Potential exploits in the documentation platform

### What NOT to Report

- Issues with Hytale game itself (report to Hypixel Studios)
- General bugs or feature requests (use GitHub Issues)
- Documentation typos or errors (use GitHub Issues)

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, report security vulnerabilities by:

1. **GitHub Security Advisories** (Preferred)
   - Go to the repository's Security tab
   - Click "Report a vulnerability"
   - Fill out the form with details

2. **Private Contact**
   - Open a GitHub issue with minimal details asking to discuss privately
   - A maintainer will reach out to establish secure communication

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggestions for fixing the issue
- Your GitHub username (for acknowledgment)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Depends on severity and complexity

### Disclosure Policy

- We will acknowledge receipt of your vulnerability report
- We will provide an estimated timeline for a fix
- We will notify you when the vulnerability is fixed
- We will credit you in our security advisories (unless you prefer to remain anonymous)

### Security Best Practices for Contributors

If you're contributing to this project:

1. **Dependencies**
   - Keep dependencies up to date
   - Review security advisories for dependencies
   - Run `bun audit` regularly

2. **Code Review**
   - All changes go through pull request review
   - Security-sensitive changes require extra scrutiny

3. **Secrets Management**
   - Never commit API keys, tokens, or credentials
   - Use environment variables for sensitive data
   - Review `.gitignore` to prevent accidental commits

4. **User Input**
   - Sanitize all user input
   - Validate data on both client and server
   - Use appropriate encoding for output

## Known Security Considerations

### Third-Party Content

This documentation may link to external resources. We are not responsible for the content or security of external websites. Users should exercise caution when:

- Downloading mods or plugins from external sources
- Running code examples from the documentation
- Following links to third-party resources

### Community Contributions

While we review all contributions, users should:

- Review code examples before using them in production
- Test plugins in safe environments first
- Verify information against official Hytale sources

### Development Environment

When running the site locally:

- Only install dependencies from trusted sources
- Keep your development environment secure
- Be cautious with `.env` files containing sensitive data

## Security Updates

Security patches are applied as follows:

1. **Critical**: Immediate hotfix to main branch
2. **High**: Patched within 24-48 hours
3. **Medium**: Patched in next regular update
4. **Low**: Addressed in upcoming releases

## Contact

For urgent security matters that cannot be disclosed publicly, please use GitHub's security advisory feature or contact the project maintainers through Discord (available in the README).

## Acknowledgments

We appreciate the security research community and will acknowledge all valid security reports. If you wish to be credited:

- We'll add your name to our security acknowledgments
- We'll credit you in the relevant security advisory
- We may feature your contribution in release notes

Thank you for helping keep the Hytale Modding Documentation site secure!

