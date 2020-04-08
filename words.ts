import fs from 'fs';

const data = fs.readFileSync('./singular.txt', 'utf8')
    .split('\n')
    .map(line => line.toLowerCase())
    .filter(line => /^[а-я]*$/.test(line))
    .reduce((r, line) => {
        // @ts-ignore
        r[line.length] = r[line.length] || [];

        // @ts-ignore
        r[line.length].push(line);

        return r;
    }, {});

fs.writeFileSync('./singularbylength.json', JSON.stringify(data, null, 2));