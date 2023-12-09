import { useDebounce } from "@uidotdev/usehooks";
import { Event, SimplePool } from "nostr-tools";
import React, { useEffect, useRef, useState } from "react";
import { MetadataPbKey } from "../types/MetadataPbKey";
import { RELAYS } from "../../../constants/RELAYS";
import { BinarySearchDescDate } from "../../../utils/BinarySearchDescDate";
import { Text } from "react-native-paper";
import { View } from "react-native";

export const EventList = () => {
  const [pool, setPool] = useState<SimplePool | null>(null);
  const [eventsImmediate, setEvents] = useState<Event[]>([]);
  const [metadata, setMetadata] = useState<Record<string, MetadataPbKey>>({});
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [events] = useDebounce(eventsImmediate, 400);
  const metadataFetched = useRef<Record<string, boolean>>({});

  /**
   * Settin up relays pool
   */
  useEffect(() => {
    console.log(global.TextEncoder);
    const _pool = new SimplePool();
    setPool(_pool);

    return () => {
      _pool.close(RELAYS);
    };
  }, []);

  /**
   * Subscribing to events
   */
  useEffect(() => {
    if (!pool) return;
    setEvents([]);
    const sub = pool.sub(RELAYS, [
      {
        kinds: [1],
        limit: 10,
        "#t": hashtags.length > 0 ? hashtags : undefined,
      },
    ]);

    sub.on("event", (data: Event) => {
      setEvents((curr) => BinarySearchDescDate(curr, data));
    });

    return () => {
      sub.unsub();
    };
  }, [hashtags, pool]);

  useEffect(() => {
    if (!pool) return;

    const pubKeysToFetch = eventsImmediate
      .filter((event) => metadataFetched.current[event.pubkey] !== true)
      .map((event) => event.pubkey);

    pubKeysToFetch.map((pubKey) => (metadataFetched.current[pubKey] = true));

    const sub = pool.sub(RELAYS, [
      {
        kinds: [0],
        authors: pubKeysToFetch,
      },
    ]);

    sub.on("event", (data: Event) => {
      const metadata = JSON.parse(data.content) as MetadataPbKey;

      setMetadata((curr) => ({
        ...curr,
        [data.pubkey]: metadata,
      }));
    });

    // eose = end of stored events
    sub.on("eose", () => {
      sub.unsub();
    });

    return () => {};
  }, [events, pool]);
  return (
    <View>
      {eventsImmediate.map((evento) => {
        return (
          <View key={crypto.randomUUID()}>
            <Text>{evento.content}</Text>
          </View>
        );
      })}
    </View>
  );
};
