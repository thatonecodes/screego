# Frequently Asked Questions

## Stream doesn't load

Check that
* you are using https to access Screego.
* `SCREEGO_EXTERNAL_IP` is set to your external IP. See [Configuration](config.md)
* you are using TURN for NAT-Traversal. See [NAT-Traversal](nat-traversal.md). *This isn't allowed for app.screego.net, you've to self-host Screego*
* your browser doesn't block WebRTC (extensions or other settings)
* you have opened ports in your firewall. By default 5050, 3478 and any UDP port when using TURN.

## Automatically create room on join

Sometimes you want to reuse the screego room, but always have to recreate it.
By passing `create=true` in the url, you can automatically create the room if it does not exist.

Example: https://app.screego.net/?room=not-existing-room&create=true

## Automatically add username on join

To include a username when someone joins a room (useful for invitation links), add the `name` parameter to the URL.
This sets the username to _Alex_ when the user joins the room.

Example: https://app.screego.net/?room=my-room&name=Alex
