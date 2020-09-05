
module.exports = (plop) => {
    const templatesDirectory="scaffolding/plop-templates";
    plop.setHelper('isRef', function (value) {
        return value.type == "ref";
    });
    // controller generator
    plop.setGenerator('crud', {
        description: 'create crud module in angular',
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
            // //module
            // {
            //     type: 'add',
            //     path: 'src/app/{{entity.name}}/module.ts',
            //     templateFile: `${templatesDirectory}/crud/module.hbs`,
            // },
            // {
            //     type: 'add',
            //     path: 'src/app/{{entity.name}}/routing.module.ts',
            //     templateFile: `${templatesDirectory}/crud/module_routing.hbs`,
            // },
            // {
            //     type: 'add',
            //     path: 'src/app/{{entity.name}}/service.module.ts',
            //     templateFile: `${templatesDirectory}/crud/module_service.hbs`,
            // },
            // //models
            // {
            //     type: 'add',
            //     path: 'src/app/shared/models/{{camelCase entity.name}}/{{camelCase entity.name}}.ts',
            //     templateFile: `${templatesDirectory}/crud/models/model.hbs`
            // },
            // {
            //     type: 'add',
            //     path: 'src/app/shared/models/{{camelCase entity.name}}/{{camelCase entity.name}}CreateModel.ts',
            //     templateFile: `${templatesDirectory}/crud/models/create_model.hbs`
            // },
            // {
            //     type: 'add',
            //     path: 'src/app/shared/models/{{camelCase entity.name}}/{{camelCase entity.name}}EditModel.ts',
            //     templateFile: `${templatesDirectory}/crud/models/edit_model.hbs`
            // },
            // {
            //     type: 'add',
            //     path: 'src/app/shared/models/{{camelCase entity.name}}/{{camelCase entity.name}}DetailsModel.ts',
            //     templateFile: `${templatesDirectory}/crud/models/details_model.hbs`
            // },
            // {
            //     type: 'add',
            //     path: 'src/app/shared/models/{{camelCase entity.name}}/index.ts',
            //     templateFile: `${templatesDirectory}/crud/models/index.hbs`
            // },
            // //http service
            // {
            //     type: 'add',
            //     path: 'src/app/shared/services/{{camelCase entity.name}}.service.ts',
            //     templateFile: `${templatesDirectory}/crud/http_service.hbs`
            // },
            // {
            //     type: 'append',
            //     path: 'src/app/shared/services/index.ts',
            //     template: `export { {{pascalCase entity.name}}Service } from './{{camelCase entity.name}}.service';`
            // },
            // //translate
            // {
            //     type: 'add',
            //     path: 'src/assets/i18n/{{camelCase entity.name}}/en-US.json',
            //     templateFile: `${templatesDirectory}/crud/translates/en.hbs`
            // },
            // {
            //     type: 'add',
            //     path: 'src/assets/i18n/{{camelCase entity.name}}/fa-IR.json',
            //     templateFile: `${templatesDirectory}/crud/translates/fa.hbs`
            // }
            // //list
            // {
            //     type: 'add',
            //     path: 'src/app/{{camelCase entity.name}}/{{camelCase entity.name}}-list/{{camelCase entity.name}}-list.component.ts',
            //     templateFile: `${templatesDirectory}/crud/list/typescript.hbs`
            // },
            // {
            //     type: 'add',
            //     path: 'src/app/{{camelCase entity.name}}/{{camelCase entity.name}}-list/{{camelCase entity.name}}-list.component.html',
            //     templateFile: `${templatesDirectory}/crud/list/html.hbs`
            // },
            // {
            //     type: 'add',
            //     path: 'src/app/{{camelCase entity.name}}/{{camelCase entity.name}}-list/{{camelCase entity.name}}-list.component.scss',
            // },
            // create
            {
                type: 'add',
                path: 'src/app/{{camelCase entity.name}}/{{camelCase entity.name}}-create/{{camelCase entity.name}}-create.component.ts',
                templateFile: `${templatesDirectory}/crud/create/typescript.hbs`
            },
            {
                type: 'add',
                path: 'src/app/{{camelCase entity.name}}/{{camelCase entity.name}}-create/{{camelCase entity.name}}-create.component.html',
                templateFile: `${templatesDirectory}/crud/create/html.hbs`
            },
            {
                type: 'add',
                path: 'src/app/{{camelCase entity.name}}/{{camelCase entity.name}}-create/{{camelCase entity.name}}-create.component.scss',
            }
        ]
    });
};