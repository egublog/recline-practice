import { describe, it, vi, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '../../test/utils';
import TodoItem from './index';
import type { Todo } from '../../types/todo';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: 1,
    text: 'テストTODO',
    completed: false,
  };

  const mockHandlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('TODOアイテムが正しく表示される', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    expect(screen.getByText('テストTODO')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('チェックボックスをクリックするとonToggleが呼ばれる', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('編集ボタンをクリックすると編集モードになる', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // 編集ボタンをクリック
    const editButton = screen.getByRole('button', { name: '編集' });
    fireEvent.click(editButton);
    
    // 入力フィールドが表示されていることを確認
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(mockTodo.text);

    // 編集・削除ボタンが非表示になっていることを確認
    expect(screen.queryByRole('button', { name: '編集' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '削除' })).not.toBeInTheDocument();
  });

  it('編集モードでEnterを押すとonEditが呼ばれる', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // 編集モードに切り替え
    const editButton = screen.getByRole('button', { name: '編集' });
    fireEvent.click(editButton);
    
    const input = screen.getByRole('textbox');
    const newText = '更新されたTODO';
    
    // テキストを変更してEnterを押す
    fireEvent.change(input, { target: { value: newText } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTodo.id, newText);
    
    // 編集モードが終了していることを確認
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
  });

  it('編集モードでEscapeを押すと編集がキャンセルされる', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    // 編集モードに切り替え
    const editButton = screen.getByRole('button', { name: '編集' });
    fireEvent.click(editButton);
    
    const input = screen.getByRole('textbox');
    
    // テキストを変更してEscapeを押す
    fireEvent.change(input, { target: { value: '更新されたTODO' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // 元のテキストが表示され、編集モードが終了していることを確認
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
    expect(mockHandlers.onEdit).not.toHaveBeenCalled();
  });

  it('削除ボタンをクリックするとonDeleteが呼ばれる', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />);
    
    const deleteButton = screen.getByRole('button', { name: '削除' });
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('完了状態のTODOは取り消し線が表示される', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} {...mockHandlers} />);
    
    const todoText = screen.getByText(mockTodo.text);
    expect(todoText).toHaveStyle({ textDecoration: 'line-through' });
  });
});
