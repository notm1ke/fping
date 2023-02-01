import { exec } from 'child_process';

type PingHostBase = {
    host: string;
    alive: boolean;
}

type PingHostAlive = PingHostBase & {
    elapsed: number;
};

export type PingHostResponse = PingHostBase | PingHostAlive;

/**
 * Attempts to ping provided hostnames,
 * and returns an array of PingHostResponse objects
 * representing the status of each host.
 * 
 * @param hosts the list of hostnames to ping
 * @returns the responses in the form of PingHostResponse objects
 */
export default async (...hosts: string[]): Promise<PingHostResponse[]> => 
    new Promise((res, _rej) => exec(`fping -e -t 1500 ${hosts.join(' ')}`, (err, stdout, stderr) => {
        let lines = stdout
            .concat(stderr)
            .toString()
            .trim()
            .split('\n');

        let results = lines.map(line => {
            if (line.includes('is alive')) {
                let host = line.split(' is alive')[0];
                let elapsed = parseInt(line.split('(')[1].split(')')[0].split(' ')[0]);
                return { host, elapsed, alive: true };
            }

            if (line.includes('is unreachable')) {
                let host = line.split(' is unreachable')[0];
                return { host, alive: false };
            }

            if (line.includes('nodename nor servname provided, or not known')) {
                let host = line.split(':')[0];
                return { host, alive: false };
            }

            return null;
        });

        return res(results);
    }));