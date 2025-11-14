import styled from 'styled-components';
import { readDir, BaseDirectory, DirEntry } from '@tauri-apps/plugin-fs';
import { useCallback, useEffect, useState } from 'react';
import { join } from '@tauri-apps/api/path';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    gap: 8px;
`;

interface Item extends DirEntry {
    nested?: DirEntry[];
}
export default function FolderSelector() {
    const [items, setItems] = useState<Item[]>([]);
    const [parent, setParent] = useState('./');

    const fetchItems = useCallback(
        async (dir = parent) => {
            try {
                const _items: Item[] = [];
                const entries = await readDir(dir, { baseDir: BaseDirectory.Home });

                for (const entry of entries) {
                    if (entry.isDirectory && !entry.name.startsWith('.')) {
                        _items.push(entry);
                    }
                }

                if (!entries.length || !_items.length) {
                    return;
                }

                setItems(_items);
            } catch (e) {
                console.error(e);
            }
        },
        [parent]
    );

    const handleSelect = useCallback(
        async (e) => {
            const selectedDir = e.target.value;
            const dir = await join(parent, selectedDir);
            setParent(dir);
            void fetchItems(dir);
        },
        [fetchItems, parent]
    );

    useEffect(() => {
        if (items.length > 0) return;
        void fetchItems();
    }, [fetchItems, items.length]);

    return (
        <Wrapper>
            <div>{parent}: </div>{' '}
            <select name="folder" id="folders" onChange={handleSelect}>
                {items.map((item) => (
                    <option key={item.name} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
        </Wrapper>
    );
}
