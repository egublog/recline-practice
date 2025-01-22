import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { StatusBadges } from './StatusBadges';

describe('StatusBadges', () => {
  const defaultProps = {
    totalCount: 5,
    completedCount: 2,
    pendingCount: 3,
  };

  it('全てのバッジが表示される', () => {
    render(<StatusBadges {...defaultProps} />);
    
    // chakra-badgeクラスを持つ要素を検索
    const badges = screen.getAllByText(/タスク/);
    expect(badges).toHaveLength(3);

    // 各バッジのテキストを確認
    expect(badges[0]).toHaveTextContent(`全てのタスク: ${defaultProps.totalCount}`);
    expect(badges[1]).toHaveTextContent(`完了したタスク: ${defaultProps.completedCount}件`);
    expect(badges[2]).toHaveTextContent(`残りのタスク: ${defaultProps.pendingCount}件`);
  });

  it('カウントが正しく表示される', () => {
    render(<StatusBadges {...defaultProps} />);
    
    expect(screen.getByText(`全てのタスク: ${defaultProps.totalCount}`)).toHaveClass('chakra-badge');
    expect(screen.getByText(`完了したタスク: ${defaultProps.completedCount}件`)).toHaveClass('chakra-badge');
    expect(screen.getByText(`残りのタスク: ${defaultProps.pendingCount}件`)).toHaveClass('chakra-badge');
  });

  it('カウントが0の場合も正しく表示される', () => {
    const zeroProps = {
      totalCount: 0,
      completedCount: 0,
      pendingCount: 0,
    };

    render(<StatusBadges {...zeroProps} />);

    expect(screen.getByText('全てのタスク: 0')).toBeInTheDocument();
    expect(screen.getByText('完了したタスク: 0件')).toBeInTheDocument();
    expect(screen.getByText('残りのタスク: 0件')).toBeInTheDocument();
  });

  it('バッジのスタイルが正しく適用されている', () => {
    render(<StatusBadges {...defaultProps} />);
    
    // すべてのバッジ要素がChakra UIのバッジクラスを持っていることを確認
    const badges = screen.getAllByText(/タスク/);
    badges.forEach(badge => {
      expect(badge).toHaveClass('chakra-badge');
    });
  });
});
