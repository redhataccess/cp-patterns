'use strict';
var yeoman = require( 'yeoman-generator' );
var chalk = require( 'chalk' );
var yosay = require( 'yosay' );
module.exports = yeoman.Base.extend( {
    prompting: function() {
        var done = this.async();
        // Have Yeoman greet the user.
        this.log( yosay( 'Welcome to the ' + chalk.red( 'WebRH' ) + ' generator!' ) );
        var prompts = [ {
            type: 'list',
            name: 'type',
            message: 'What would you like to create?',
            choices: [ 'component', 'layout', 'pattern', 'pattern_group', 'sub_pattern' ]
        }, {
            type: 'input',
            name: 'name',
            message: 'What will this be called (i.e. \'Awesome video\')',
            validate: function( answer ) {
                if ( answer.length < 1 ) {
                    return 'I get it, naming is hard; but it must have a name. You can always change it later.';
                }
                return true;
            }
        }, {
            type: 'checkbox',
            name: 'template_component_elements',
            message: 'Would you like to include any of the templated elements below?',
            choices: [ 'config', 'title', 'headline', 'summary' ],
            when: function( answers ) {
                return answers.type == 'component';
            }
        }, {
            type: 'checkbox',
            name: 'component_config_options',
            message: 'Would you like to include any of the templated config options below?',
            choices: [ 'align', 'size' ],
            when: function( answers ) {
                return answers.type == "component" && answers.template_component_elements.includes( 'config' );
            }
        }, {
            type: 'checkbox',
            name: 'template_pattern_elements',
            message: 'Would you like to include any of the templated elements below?',
            choices: [ 'config', 'background', 'header', 'body', 'aside', 'footer', 'cta' ],
            when: function( answers ) {
                return answers.type.includes( 'pattern' ) || answers.type.includes( 'pattern_group' );
            }
        }, {
            type: 'checkbox',
            name: 'pattern_config_options',
            message: 'Would you like to include any of the templated config options below?',
            choices: [ 'theme', 'align', 'layout' ],
            when: function( answers ) {
                return answers.type.includes( "pattern" ) && answers.template_pattern_elements.includes( 'config' ) && answers.type.includes( "pattern_group" );
            }
        }, {
            type: 'checkbox',
            name: 'template_layout_elements',
            message: 'Would you like to include any of the templated elements below?',
            choices: [ 'config', 'background', 'header', 'body', 'aside', 'footer' ],
            when: function( answers ) {
                return answers.type == 'layout';
            }
        }, {
            type: 'checkbox',
            name: 'layout_config_options',
            message: 'Would you like to include any of the templated config options below?',
            choices: [ 'collapse', 'vertical_spacing', "eqpts", "justify", 'theme' ],
            when: function( answers ) {
                return answers.type == "layout" && answers.template_layout_elements.includes( 'config' );
            }
        }, {
            type: 'input',
            name: 'custom_elements',
            message: 'Would you like to include any custom elements? (i.e. \'my-el, my-other-el\')'
        } ];
        this.prompt( prompts, function( props ) {
            this.props = props;
            if ( !this.props.template_component_elements ) {
                this.props.template_component_elements = [];
            }
            if ( !this.props.component_config_options ) {
                this.props.component_config_options = [];
            }
            if ( !this.props.template_layout_elements ) {
                this.props.template_layout_elements = [];
            }
            if ( !this.props.layout_config_options ) {
                this.props.layout_config_options = [];
            }
            if ( !this.props.template_pattern_elements ) {
                this.props.template_pattern_elements = [];
            }
            if ( !this.props.pattern_config_options ) {
                this.props.pattern_config_options = [];
            }
            var element_types = [];
            if ( this.props.custom_elements ) {
                this.props.custom_elements.split( ',' ).forEach( function( element, idx ) {
                    element_types.push( {
                        type: 'list',
                        name: element.trim(),
                        message: 'Select a data type for ' + element.trim() + ':',
                        choices: [ 'string', 'number', 'boolean', 'object', 'array' ],
                        default: 'string'
                    } );
                } );
                // Get types for custom elements
                this.prompt( element_types, function( types ) {
                    this.props.custom_elements_full = {};
                    for ( var key in types ) {
                        this.props.custom_elements_full[ key ] = types[ key ];
                    }
                    done();
                }.bind( this ) );
            } else {
                done();
            }
        }.bind( this ) );
    },
    writing: {
        app: function() {
            function toDash( string ) {
                return string.trim().replace( / /g, "-" ).replace( /_/g, "-" ).toLowerCase();
            };

            function toUnderscore( string ) {
                return string.trim().replace( / /g, "_" ).replace( /-/g, "_" ).toLowerCase();
            };

            function cleanElements( array, toFormat ) {
                var new_array = [];
                array.forEach( function( val, idx ) {
                    new_array.push( toFormat( val ) );
                } );
                return new_array;
            };
            // special name formats
            this.props.name_dash = toDash( this.props.name );
            this.props.name_underscore = toUnderscore( this.props.name );
            // convert to array and clean
            if ( this.props.custom_elements_full ) {
                this.props.custom_elements_dash = this.props.custom_elements_full;
            }
            var path, template;
            switch ( this.props.type ) {
                case "component":
                    template = this.props.type;
                    path = "src/library/components/" + this.props.name_underscore;
                    break;
                case "layout":
                    template = this.props.type;
                    path = "src/library/layouts/" + this.props.name_underscore;
                    break;
                case "pattern":
                    template = this.props.type;
                    path = "src/library/patterns/" + this.props.name_underscore;
                    break;
                case "pattern_group":
                    template = "pattern";
                    path = "src/library/pattern_groups/" + this.props.name_underscore;
                    break;
                case "sub_pattern":
                    template = "pattern";
                    path = "src/library/sub_patterns/" + this.props.name_underscore;
                    break;
            }
            try {
                if ( this.props.type ) {
                    this.fs.copyTpl( this.templatePath( template + '/api/_' + template + '.json' ), this.destinationPath( path + '/api/' + this.props.name_underscore + '.json' ), {
                        props: this.props
                    } );
                    this.fs.copyTpl( this.templatePath( template + '/api/_' + template + '.twig' ), this.destinationPath( path + '/api/' + this.props.name_underscore + '.twig' ), {
                        props: this.props
                    } );
                    this.fs.copyTpl( this.templatePath( template + '/docs/_' + template + '.docs.yaml' ), this.destinationPath( path + '/docs/' + this.props.name_underscore + '.docs.yaml' ), {
                        props: this.props
                    } );
                    this.fs.copyTpl( this.templatePath( template + '/docs/_' + template + '.docs.md' ), this.destinationPath( path + '/docs/' + this.props.name_underscore + '.docs.md' ), {
                        props: this.props
                    } );
                    if ( template == 'component' || template == 'layout' ) {
                        this.fs.copyTpl( this.templatePath( template + '/styles/_' + template + '.scss' ), this.destinationPath( path + '/styles/_' + this.props.name_underscore + '.scss' ), {
                            props: this.props
                        } );
                    }
                    this.fs.copyTpl( this.templatePath( template + '/tests/_' + template + '.tests.js' ), this.destinationPath( path + '/tests/' + this.props.name_underscore + '.tests.js' ), {
                        props: this.props
                    } );
                    this.fs.copyTpl( this.templatePath( template + '/tests/_' + template + '.tests.json' ), this.destinationPath( path + '/tests/' + this.props.name_underscore + '.tests.json' ), {
                        props: this.props
                    } );
                }
            } catch ( error ) {
                console.log( error );
                console.log( "------\nProperties set by yeoman:\n" );
                console.log( this.props );
            }
        }
    },
    install: function() {}
} );
