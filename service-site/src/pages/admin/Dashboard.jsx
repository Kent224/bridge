import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  h1 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-lg);
    color: var(--text-primary);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const StatCard = styled.div`
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  
  h3 {
    font-size: var(--font-size-md);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
  }
  
  p {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--primary-color);
    margin: 0;
  }
`;

const RecentActionsCard = styled.div`
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-lg);
  
  h2 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--gray-200);
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Dashboard = () => {
  // ダミーデータ
  const stats = [
    { title: '総アクセス数', value: '5,234' },
    { title: '会員数', value: '342' },
    { title: '記事数', value: '28' },
    { title: '今月のアクセス', value: '1,432' }
  ];
  
  const recentActions = [
    { action: '新規記事「AIの未来展望」が公開されました', time: '2時間前' },
    { action: 'ユーザー「tanaka@example.com」が新規登録しました', time: '5時間前' },
    { action: 'サイト設定が更新されました', time: '昨日' },
    { action: '記事「プロンプトエンジニアリング入門」が更新されました', time: '2日前' }
  ];

  return (
    <DashboardContainer>
      <h1>ダッシュボード</h1>
      
      <StatsContainer>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </StatCard>
        ))}
      </StatsContainer>
      
      <RecentActionsCard>
        <h2>最近のアクティビティ</h2>
        <ul>
          {recentActions.map((item, index) => (
            <li key={index}>
              <strong>{item.action}</strong> - {item.time}
            </li>
          ))}
        </ul>
      </RecentActionsCard>
    </DashboardContainer>
  );
};

export default Dashboard; 