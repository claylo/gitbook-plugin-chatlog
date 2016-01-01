# gitbook-plugin-chatlog

Easily format a chat exchange in your book.

```
{% chathead date="12/31/15" %}{% endchathead %}

{% msg from="mojombo", time="05:59:01pm PST" %}
Mmmm. Chat.
{% endmsg %}

{% msg from="claylo", time="05:59:20pm PST" %}
yeah, man.
{% endmsg %}

{% chatfoot %}{% endchatfoot %}
```

![Preview of chatlog](screencap.png)

## Installation

First, add this plugin to your `book.json`:

```json
{
  "plugins": ["chatquote"]
}
```

Then install the plugin locally:

```shell
$ gitbook install
```

## Configuration

Styles for each chat participant are defined within `pluginsConfig`.

```json
{
  "plugins": ["chatquote"],
  "pluginsConfig": {
    "chatlog": {
      "users": {
        "claylo": {
          "balloon": "#08f",
          "text": "#fff"
        },
        "mojombo": {
          "balloon": "#ddd",
          "text": "#000"
        }
      }
    }
  }
}
```

Any username can be used as the key, so long as it is defined within the plugin configuration.

