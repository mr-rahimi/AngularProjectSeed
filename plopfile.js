
module.exports = (plop) => {
    const templatesDirectory="scaffolding/plop-templates";
    // controller generator
    plop.setGenerator('controller', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'config',
            message: 'please enter config file path?'
        }],
        actions: [
            (data) => {
                let fs = require('fs')
                let content = fs.readFileSync(process.cwd() + "/" + data.config).toString()
                let d = JSON.parse(content);
                data.entity = d;
            },
            {
                type: 'add',
                path: 'src/app/{{entity.name}}/module.ts',
                templateFile: `${templatesDirectory}/crud/module.hbs`,
            },
            {
                type: 'add',
                path: 'src/app/{{entity.name}}/routing.module.ts',
                templateFile: `${templatesDirectory}/crud/module_routing.hbs`,
            },
            {
                type: 'add',
                path: 'src/app/{{entity.name}}/{{entity.listName}}-list.service.ts',
                templateFile: `${templatesDirectory}/crud/module_routing.hbs`,
            }
        ]
    });
};