## <%= props.name.charAt( 0 ).toUpperCase() + props.name.toLowerCase().slice(1) %> <%= props.type %>
About the <%= props.name %> <%= props.type %>...

### Options
<% props.pattern_config_options.forEach( function( element ) { if ( element == 'theme' ) { %>
The <%= props.name %> <%= props.type %> has 2 content theming options.  Components can opt into themes.

- `data-rh-theme="dark"` : Typically this indicates a dark background image or color and often affects font colors for readability.
- `data-rh-theme="light"` : Typically this indicates a light background image or color and often affects font colors for readability.
<% } else if ( element == 'align') { %>
The <%= props.name %> <%= props.type %> has 3 content alignment options:

- `data-rh-align="left"` : aligned left
- `data-rh-align="center"` : aligned center
- `data-rh-align="right"` : aligned right
<%} });%>

### Example usage
```
{% include '<%= props.name_underscore %>.twig' with {
    "name": "<%= props.name_underscore %>"<% props.template_pattern_elements.forEach( function( element ) { %>,
    "<%= element %>": {}<% });  for (var element in props.custom_elements_dash) { var type = props.custom_elements_dash[element]; %>,
    "<%= element.replace('-','_') %>": <% if( type == 'object' ){ %>{}<% } else if( type == 'array') { %>[]<% } else if( type == 'boolean'){ %>false<% } else if( type == 'number'){ %>0<% } else { %> ""<% } } %>
} only %}
```
