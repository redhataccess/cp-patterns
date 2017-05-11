## <%= props.name.charAt( 0 ).toUpperCase() + props.name.slice(1) %> <%= props.type %>
About the <%= props.name %> <%= props.type %>...

### Options
<% if(props.component_config_options) { props.component_config_options.forEach( function( element ) { if ( element == 'align' ) { %>
The <%= props.name %> <%= props.type %> has 3 content alignment options:

- `data-rh-align="left"` : aligned left
- `data-rh-align="center"` : aligned center
- `data-rh-align="right"` : aligned right

<% } else if ( element == 'size' ) { %>
The <%= props.name %> <%= props.type %> has 3 content sizing options:

- `data-rh-size="small"` : about this size
- `data-rh-size="medium"` : about this size
- `data-rh-size="large"` : about this size<% } }); }%>

### Example usage
```
{% include '<%= props.name_underscore %>.twig' with {
    "name": "<%= props.name_underscore %>"<% props.template_component_elements.forEach( function( element ) { if ( element != 'config' ) { %>,
    "<%= element %>": ""<% } });  for (var element in props.custom_elements_dash) { var type = props.custom_elements_dash[element]; %>,
    "<%= element.replace('-','_') %>": <% if( type == 'object' ){ %>{}<% } else if( type == 'array') { %>[]<% } else if( type == 'boolean'){ %>false<% } else if( type == 'number'){ %>0<% } else { %> ""<% } } %>
} only %}
```
