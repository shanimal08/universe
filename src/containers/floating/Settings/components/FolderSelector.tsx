import styled from 'styled-components';
import { readDir, BaseDirectory, DirEntry } from '@tauri-apps/plugin-fs';
import { useCallback, useEffect, useState } from 'react';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    position: relative;
`;

export default function FolderSelector() {
    const [items, setItems] = useState<DirEntry[]>([]);

    const fetchItems = useCallback(async () => {
        try {
            const entries = await readDir('./', { baseDir: BaseDirectory.Home });

            for (const entry of entries) {
                if (entry.isDirectory && !entry.name.startsWith('.')) {
                    console.log(`Entry: ${entry.name}`);
                }
            }

            if (entries.length === 0) return;
            setItems(entries);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (items.length > 0) return;
        void fetchItems();
    }, [fetchItems, items.length]);

    return (
        <Wrapper>
            <div>{`this will be the file explorer thing`}</div>
            <p>{items.length}</p>
        </Wrapper>
    );
}
