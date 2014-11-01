# The Botler

The goal of this plugin is to eventually allow admins to create "menus" (yeah I got confused with butlers and waiters at some point) in the ACP. A menu will consist of a trigger, any possible filters on this trigger (like a specific user) and an action.
It should be possible for admins to either map data from the trigger data to the filter/action arguments, or to enter their own arguments.

As of right now, this plugin is unusable. Currently this plugin is only interesting for other developers who want to have a shot at working on this.
Only basic logic is implemented right now. The plugin will create a new bot user if there's none yet. There's logic for renaming the bot, but no UI.
There's support for basic triggers, filters and actions. You can check them out in their respective folders in `lib`.
In `lib/config.js` you can see a basic menu structure that will actually work if you remove the comments.

- There is no UI yet anywhere. It's not possible to create menus besides editing the `config.js`.
- For debugging reasons, the `forceUpdate` and `reset` arguments for the Settings framework are set to true. This means that a new bot user will be created every time you launch NodeBB with this plugin enabled.
- The `info` field for a trigger/filter/action will eventually be used in the UI and menu creation logic.
- Eventually I want other plugins to be able to register triggers/filters/actions.

I currently do not have the time nor motivation to actively work on this, but I still think it can turn out as an amazing plugin when some real effort is put into this.
This is the reason why I'm releasing it in it's current state. I'm hoping other NodeBB devs can work on little pieces. I'll work on this from time to time myself as well.

p.s. yes I shamelessly stole the name from @Kern--.

## Installation

    npm install nodebb-plugin-botler

