---
title: Geyser Events
description: >-
  Geyser has a powerful event system that allows you to listen to events that
  are sent by Geyser. Events are at the heart of Geyser Extensions, and can be
  used by plugins and mods as well.
crowdin_page_id: 77de57f3-e693-49a4-af6a-215f6ee6d42a
---

# Geyser Events
Geyser has a powerful event system that allows you to listen to events that are sent by Geyser. Events are at the heart of Geyser Extensions, and can be used by plugins and mods as well.

Full documentation can be found [here](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event).

## Event Categories {#event-categories}
To use events in a Spigot/Paper plugin or a Fabric mod, you need to register the Geyser Event Bus as a listener and then subscribe to the events you want to listen to.
Extensions can use the @Subscribe annotation.

Events are categorized into the following categories:
- [Bedrock](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event/bedrock): Events that are sent for each connecting Bedrock client,
  for example the ClientEmoteEvent that is sent when a Bedrock player uses an emote - or the SessionLoginEvent that is sent when a Bedrock player logged in and is about to join a server.
- [Java](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event/java): Events that are sent for the java server, for example
  the ServerDefineCommandsEvent - it is fired when the Java sends the commands to show for Bedrock players.
- [Connection](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event/connection): Connection-related events, such as a ping event to return e.g. a custom MOTD.
- [Lifecycle](https://github.com/GeyserMC/Geyser/tree/master/api/src/main/java/org/geysermc/geyser/api/event/lifecycle): Events that are sent during Geyser's lifecycle, such as the loading of custom items, resource packs, or Geyser commands.

To see all the events in the respective categories, click on the links above.

## Usage Examples: {#usage-examples}

Each method that you want to subscribe to an event needs to be annotated with the @Subscribe annotation (from the GeyserMC events package).
```java
@Subscribe
public void onGeyserLoadResourcePacksEvent(GeyserLoadResourcePacksEvent event) {
    logger().info("Loading: " + event.resourcePacks().size() + " resource packs.");
    // you could add a resource pack with event.resourcePacks().add(path-to-pack)
}
```
If you wish to listen to events in a Spigot/Paper plugin or a Fabric mod, you need to register the Geyser Event Bus as a listener first. Just make sure you implement `EventRegistrar` in the main class of your mod or plugin.
Extensions do not need to do that - they are automatically registered, so a simple @Subscribe annotation is enough.

**Paper/Spigot plugin example:**

1. In your plugin.yml, add the following lines:
```yaml
  depend: ["Geyser-Spigot"]
```
This ensures that your plugin loads after Geyser has, so the Geyser API would be available.

2. In your main class, implement the EventRegistrar interface and register the event bus in the onEnable method:
```java
public class ExamplePlugin extends JavaPlugin implements EventRegistrar {
    
    @Override
    public void onEnable(){
        getLogger().info("Registering Geyser event bus!");
        GeyserApi.api().eventBus().register(this, this); // register your plugin & this class instance as a listener
    }

    // here an event, we subscribe as usual with the @Subscribe annotation
    @Subscribe
    public void onGeyserPostInitializeEvent(GeyserPostInitializeEvent event) {
        getLogger().info("Geyser started!");
    }
}
```
3. If you want to provide your event with a consumer, rather than annotating it, you can also manually subscribe your method to the event bus:
```java
// add this after you register your event registrar in onEnable
GeyserApi.api().eventBus().subscribe(this, GeyserPostInitializeEvent.class, this::onGeyserPostInitializeEvent);
```

**Fabric mod example:**
```java
public class ExampleMod implements ModInitializer, EventRegistrar {
    public static final Logger LOGGER = LoggerFactory.getLogger("modid");
    
    @Override 
    public void onInitialize() {
        ServerLifecycleEvents.SERVER_STARTING.register((server) -> {
            GeyserApi.api().eventBus().register(this, this); // register your mod & this class instance as a listener
        });
        
        LOGGER.info("Geyser is cool!");
    }
    
    // here an event, we subscribe as usual with the @Subscribe annotation
    @Subscribe 
    public void onGeyserPostInitializeEvent(GeyserPostInitializeEvent event) {
        LOGGER.info("Geyser started!");
    }
}
```
:::info
    Note: We cannot directly register the event bus in the mod initializer, since the Geyser API would not be loaded yet.
:::

Therefore, we register it in the server starting event provided by the Fabric API.

## Event Priority {#event-priority}
Events can have a priority, which is used to determine the order in which the listeners are called. The default priority is NORMAL.
To (optionally) set the priority of your event listener, you can add the priority to the `@Subscribe` annotation:
```java
@Subscribe(postOrder = PostOrder.EARLY)
```
If you do not specify a priority, the default priority is used. For all available priorities, see
[here](https://github.com/GeyserMC/Events/blob/master/src/main/java/org/geysermc/event/PostOrder.java).
