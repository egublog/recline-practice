import { describe, it, vi, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '../../test/utils';
import { TodoForm } from './index';

describe('TodoForm', () => {
  const mockOnAdd = vi.fn().mockReturnValue(true);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('初期状態で空の入力フィールドが表示される', () => {
    render(<TodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('入力フィールドが更新される', () => {
    render(<TodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    fireEvent.change(input, { target: { value: '新しいTODO' } });
    
    expect(input).toHaveValue('新しいTODO');
  });

  it('Enterキーを押すと確認モーダルが表示される', () => {
    render(<TodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    fireEvent.change(input, { target: { value: '新しいTODO' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(screen.getByText('タスクの追加')).toBeInTheDocument();
    expect(screen.getByText('新しいTODO')).toBeInTheDocument();
  });

  it('空の入力でEnterキーを押してもモーダルは表示されない', () => {
    render(<TodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(screen.queryByText('タスクの追加')).not.toBeInTheDocument();
  });

  it('追加ボタンをクリックすると確認モーダルが表示される', () => {
    render(<TodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    fireEvent.change(input, { target: { value: '新しいTODO' } });
    
    const addButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(addButton);
    
    expect(screen.getByText('タスクの追加')).toBeInTheDocument();
  });

  it('確認モーダルで追加を押すとonAddが呼ばれ入力がクリアされる', async () => {
    render(<TodoForm onAdd={mockOnAdd} />);
    
    // TODOを入力
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    fireEvent.change(input, { target: { value: '新しいTODO' } });
    
    // 追加ボタンをクリック
    const addButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(addButton);
    
    // モーダルの追加ボタンをクリック
    const modalAddButton = screen.getByRole('button', { name: 'タスクを追加' });
    fireEvent.click(modalAddButton);
    
    // onAddが呼ばれたことを確認
    expect(mockOnAdd).toHaveBeenCalledWith('新しいTODO');
    
    // 入力がクリアされたことを確認
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('確認モーダルでキャンセルを押すとモーダルが閉じて入力は保持される', async () => {
    render(<TodoForm onAdd={mockOnAdd} />);
    
    // TODOを入力
    const input = screen.getByPlaceholderText('新しいタスクを入力...');
    fireEvent.change(input, { target: { value: '新しいTODO' } });
    
    // 追加ボタンをクリック
    const addButton = screen.getByRole('button', { name: '追加' });
    fireEvent.click(addButton);
    
    // キャンセルボタンをクリック
    const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
    fireEvent.click(cancelButton);
    
    // モーダルが閉じていることを確認
    await waitFor(() => {
      expect(screen.queryByText('タスクの追加')).not.toBeInTheDocument();
    });
    
    // 入力が保持されていることを確認
    expect(input).toHaveValue('新しいTODO');
  });
});
