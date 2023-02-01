# fping

![version badge](https://img.shields.io/github/package-json/v/notm1ke/fping?color=2573bc)
![vuln badge](https://img.shields.io/snyk/vulnerabilities/github/notm1ke/fping)

This is a TypeScript wrapper for the [fping](https://github.com/schweikert/fping) CLI utility.

## Installation

Use npm to install this project.

```bash
npm install fping
```

Ensure your system has the fping CLI utility installed. On Debian-based systems, this can be done with:

```bash
sudo apt install fping
```

On macOS, this can be done with:

```bash
brew install fping
```

For other Linux-based systems, see if your package manager has fping, if a repository exists for it, or build it from source.

## Usage

```ts
import ping from 'fping';

// Ping some things
let responses = await ping('google.com', 'microsoft.com');
{
    {
        "host": "google.com",
        "alive": true,
        "elapsed": 57
    },
    {
        "host": "microsoft.com",
        "alive": true,
        "elapsed": 73
    }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)