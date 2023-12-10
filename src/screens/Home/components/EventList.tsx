import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useRef, useState } from "react";
import { MetadataPbKey } from "../types/MetadataPbKey";
import { RELAYS } from "../../../constants/RELAYS";
import { BinarySearchDescDate } from "../../../utils/BinarySearchDescDate";
import { View } from "react-native";
import { Relay, RelayPool } from "../../../../libs/nostr";
import { Event } from "nostr-tools";
import { ListItem } from "./ListItem";
import { FlatList } from "react-native";

export const EventList = () => {
  const [pool, setPool] = useState<RelayPool | null>(null);
  const [metadataPool, setMetadataPool] = useState<RelayPool | null>(null);
  const [eventsImmediate, setEventsImmediate] = useState<Event[]>([]);
  const [metadata, setMetadata] = useState<Record<string, MetadataPbKey>>({});
  const [hashtags, setHashtags] = useState<string[]>([]);
  const metadataFetched = useRef<Record<string, boolean>>({});

  /**
   * Settin up relays pool
   */
  useEffect(() => {
    const _pool = RelayPool(RELAYS);

    setPool(_pool);

    return () => {
      _pool.close();
    };
  }, []);

  /**
   * Subscribing to events
   */
  useEffect(() => {
    if (!pool) return;
    setEventsImmediate([]);
    pool.on("open", (relay: Relay) => {
      relay.subscribe("subid", { limit: 10, kinds: [1] });
    });

    pool.on("eose", (relay: Relay) => {
      relay.close();
    });

    pool.on("event", (_relay, _sub_id, ev: Event) => {
      setEventsImmediate((curr) => BinarySearchDescDate(curr, ev));
    });

    return () => {
      pool.close();
    };
  }, [hashtags, pool]);

  useEffect(() => {
    const _metadataPool = RelayPool(RELAYS);
    setMetadataPool(_metadataPool);
    return () => {
      _metadataPool.close();
    };
  }, [eventsImmediate]);

  useEffect(() => {
    if (!metadataPool || !pool) return;

    const pubKeysToFetch = eventsImmediate
      .filter((event) => metadataFetched.current[event.pubkey] !== true)
      .map((event) => event.pubkey);

    metadataPool.on("open", (relay) => {
      relay.subscribe("subid", {
        limit: 15,
        kinds: [0],
        authors: pubKeysToFetch,
      });
    });

    metadataPool.on("event", (relay, subid, ev: Event) => {
      const metadataUser = JSON.parse(ev.content) as MetadataPbKey;
      setMetadata((curr) => {
        return {
          ...curr,
          [ev.pubkey]: metadataUser,
        };
      });
      metadataFetched.current[ev.pubkey] = true;
    });

    metadataPool.on("eose", (relay) => {
      relay.close();
    });
  }, [metadataPool]);

  return (
    <FlatList
      data={eventsImmediate}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      renderItem={({ item, index }) => (
        <>
          {index === 0 && <View style={{ height: 4 }} />}
          <ListItem event={item} metadata={metadata[item.pubkey]} />
        </>
      )}
    />
  );
};
