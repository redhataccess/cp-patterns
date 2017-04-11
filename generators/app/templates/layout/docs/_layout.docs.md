## <%= props.name.charAt( 0 ).toUpperCase() + props.name.toLowerCase().slice(1) %> <%= props.type %>
About the <%= props.name %> <%= props.type %>...

### Options
<% props.layout_config_options.forEach( function( element ) { if ( element == 'collapse' ) { %>The <%= props.name %> <%= props.type %> has 6 padding options:

- `data-rh-collapse="full_top"` : Remove all padding from the top
- `data-rh-collapse="full_bottom"` : Remove all padding from the bottom
- `data-rh-collapse="full"` : Remove all padding from both top and bottom
- `data-rh-collapse="top"` : Reduce padding from the top
- `data-rh-collapse="bottom"` : Reduce padding from the bottom
- `data-rh-collapse="both"` : Reduce padding from both the top and bottom

<% } else if ( element == 'vertical_spacing' ) { %>
The <%= props.name %> <%= props.type %> has 3 content spacing options:

- `data-rh-layout="min-stacked"` : Half the standard space between objects
- `data-rh-layout="stacked"` : Standard space between objects
- `data-rh-layout="tall-stacked"` : Twice the standard space between objects

<% } else if ( element == 'eqpts' ) { %>
The <%= props.name %> <%= props.type %> is an optional way to style a component based on element width.  Example: `data-rh-eqpts="small: 400, medium: 600, large: 900"`.

This will add an attribute to the element `data-eq-state="small"` when the element is smaller than 400px.  You can opt into these styles using that data attribute.

More information on element queries can be found [here](https://github.com/Snugug/eq.js/).

<% } else if ( element == 'justify' ) { %>
The <%= props.name %> <%= props.type %> has 3 content justification options:

- `data-rh-justify="center"` : Align elements to the center of their container
- `data-rh-justify="top"` : Align elements to the top of their container
- `data-rh-justify="justify"` : Body or main content fills the space, pushing the footer to the bottom of the container.

<% } else if ( element == 'theme' ) { %>
The <%= props.name %> <%= props.type %> has 2 content theming options.  Components can opt into themes.

- `data-rh-theme="dark"` : Typically this indicates a dark background image or color and often affects font colors for readability.
- `data-rh-theme="light"` : Typically this indicates a light background image or color and often affects font colors for readability.
<% } });%>

### Example usage
```
{% embed '<%= props.name_underscore %>.twig' with {
    "global": _context,
    "name": "<%= props.name %>"<% props.template_layout_elements.forEach( function( element ) { if ( element != 'config' ) { %>,
    "<%= element %>": {}<% } });  for (var element in props.custom_elements_dash) { var type = props.custom_elements_dash[element]; %>,
    "<%= element.replace('-','_') %>": <% if( type == 'object' ){ %>{}<% } else if( type == 'array') { %>[]<% } else if( type == 'boolean'){ %>false<% } else if( type == 'number'){ %>0<% } else { %> ""<% } } %>
} only %}
{% endembed %}
```
