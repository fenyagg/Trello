import { ColumnState } from "../column/types";

export interface DndColumnState {
    columnId: ColumnState['id'],
    isDragging: boolean,
}

export const COLUMN_DRAG_START = 'COLUMN_DRAG_START';
export const COLUMN_DRAG_END = 'COLUMN_DRAG_END';

interface ColumnDragStartAction {
    type: typeof COLUMN_DRAG_START;
    payload: DndColumnState;
}
interface ColumnDragEndAction {
    type: typeof COLUMN_DRAG_END;
    payload: DndColumnState;
}

export type DndColumnTypes = ColumnDragStartAction | ColumnDragEndAction
