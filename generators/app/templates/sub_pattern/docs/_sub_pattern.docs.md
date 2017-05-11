## <%= props.name %> <%= props.type %>

### Example usage
```
{% include '<%= props.name_underscore %>.twig' with {
    "global": _context,
    "name": "<%= props.name %>"
} only %}
```
