// index.js

import axios from 'axios';
import { Command } from 'commander';

const program = new Command();

program
  .version('2.0.0')
  .description('A simple CLI app to fetch server status and information.');

program
  .command('status')
  .description('Fetch server status.')
  .option('-u, --urls <urls...>', 'Specify server URLs to fetch status from', 'http://localhost:3000')
  .action(async (options) => {
    const urls = options.urls.split(',');
    for (const url of urls) {
      try {
        const response = await axios.get(url);
        console.log(`Server at ${url} is running.`);
        console.log('Status:', response.status);
      } catch (error) {
        console.error(`Server at ${url} is not running.`);
      }
    }
  });

program
  .command('info')
  .description('Fetch server information.')
  .option('-u, --urls <urls...>', 'Specify server URLs to fetch information from', 'http://localhost:3000')
  .action(async (options) => {
    const urls = options.urls.split(',');
    for (const url of urls) {
      try {
        const response = await axios.get(`${url}/info`);
        console.log(`Server Information for ${url}:`);
        console.log(response.data);
      } catch (error) {
        console.error(`Failed to fetch server information from ${url}.`);
      }
    }
  });

program.parse(process.argv);
