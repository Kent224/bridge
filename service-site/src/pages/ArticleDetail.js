import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { articles as defaultArticles } from '../data/articles';

// スタイル定義
const PageContainer = styled.div`
  padding-top: var(--header-height);
`;

const ArticleHeader = styled.header`
  background: linear-gradient(135deg, #1e0a3b 0%, #191453 50%, #0c1e54 100%);
  padding: calc(var(--spacing-xl) * 2) var(--spacing-lg);
  color: var(--white);
  text-align: center;
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl) var(--spacing-md);
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
`;

const ArticleDate = styled.span`
  margin-right: var(--spacing-md);
`;

const ArticleCategory = styled.span`
  background: var(--primary-color);
  color: var(--white);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
`;

const ArticleTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 5vw, 2rem);
    line-height: 1.4;
  }
`;

const MainContent = styled.div`
  background: var(--white);
  padding: calc(var(--spacing-xl) * 3) 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl) 0;
  }
`;

const ArticleContent = styled.article`
  font-size: var(--font-size-md);
  line-height: 1.8;
  color: var(--text-primary);
  
  p {
    margin-bottom: var(--spacing-lg);
  }
  
  h2 {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin: calc(var(--spacing-xl) * 1.5) 0 var(--spacing-lg);
    color: var(--text-primary);
    
    @media (max-width: 768px) {
      font-size: calc(var(--font-size-lg) * 1.1);
      margin: var(--spacing-xl) 0 var(--spacing-md);
    }
  }
  
  h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin: var(--spacing-xl) 0 var(--spacing-md);
    color: var(--text-primary);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-md);
    }
  }
  
  ul, ol {
    margin-bottom: var(--spacing-lg);
    padding-left: var(--spacing-xl);
    
    @media (max-width: 768px) {
      padding-left: var(--spacing-lg);
    }
    
    li {
      margin-bottom: var(--spacing-sm);
    }
  }
  
  blockquote {
    border-left: 4px solid var(--primary-color);
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--light-bg);
    margin: var(--spacing-lg) 0;
    font-style: italic;
    
    @media (max-width: 768px) {
      padding: var(--spacing-sm) var(--spacing-md);
    }
    
    p:last-child {
      margin-bottom: 0;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    margin: var(--spacing-lg) 0;
  }
  
  code {
    background: var(--light-bg);
    padding: 2px var(--spacing-xs);
    border-radius: var(--radius-sm);
    font-family: monospace;
    font-size: 0.9em;
  }
  
  pre {
    background: var(--dark-bg);
    color: var(--white);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: var(--spacing-lg) 0;
    
    code {
      background: transparent;
      color: var(--white);
      padding: 0;
    }
  }
  
  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
    
    p {
      margin-bottom: var(--spacing-md);
    }
  }
`;

const ArticleImage = styled.div`
  margin: calc(var(--spacing-xl) * -2) 0 var(--spacing-xl);
  height: 400px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ShareSection = styled.div`
  margin-top: calc(var(--spacing-xl) * 2);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--gray-200);
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-md);
  }
`;

const ShareTitle = styled.h3`
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
`;

const ShareButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ShareButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--light-bg);
  color: var(--text-primary);
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

const RelatedSection = styled.div`
  margin-top: calc(var(--spacing-xl) * 2);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--gray-200);
  
  @media (max-width: 768px) {
    margin-top: var(--spacing-xl);
  }
`;

const RelatedTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedCard = styled.article`
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }
`;

const RelatedImage = styled.div`
  height: 150px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RelatedContent = styled.div`
  padding: var(--spacing-md);
`;

const RelatedArticleTitle = styled.h4`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const CTASection = styled.div`
  margin-top: calc(var(--spacing-xl) * 3);
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  border-radius: var(--radius-lg);
  text-align: center;
`;

const CTATitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
`;

const CTAText = styled.p`
  margin-bottom: var(--spacing-lg);
  color: var(--text-secondary);
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  background: #06C755;
  color: var(--white);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(6, 199, 85, 0.3);
    background: #05A847;
  }
  
  @media (max-width: 768px) {
    display: none; /* スマホビューでは非表示（フローティングボタンがあるため） */
  }
`;

const BackToArticles = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xl);
  
  &::before {
    content: '←';
    margin-right: var(--spacing-xs);
    transition: transform var(--transition-fast);
  }
  
  &:hover::before {
    transform: translateX(-3px);
  }
`;

// 引用元表示コンポーネント
const SourceCitation = styled.div`
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md) var(--spacing-lg);
  background: #f8f8f8;
  border-left: 4px solid #41C9B4;
  border-radius: var(--radius-sm);
  
  @media (max-width: 768px) {
    padding: var(--spacing-sm) var(--spacing-md);
    margin: var(--spacing-md) 0;
  }
`;

const SourceTitle = styled.h4`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
  color: #333;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
  }
`;

const SourceInfo = styled.div`
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
`;

const SourceLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  display: inline-block;
  margin-top: var(--spacing-xs);
  
  &:hover {
    text-decoration: underline;
  }
`;

const SourceIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${props => props.type === 'note' ? '#41C9B4' : 'var(--primary-color)'};
  border-radius: 50%;
  margin-right: var(--spacing-xs);
  vertical-align: middle;
  position: relative;
  top: -1px;
`;

const NoteButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #41C9B4;
  color: var(--white);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: background-color 0.2s;
  margin-top: var(--spacing-lg);

  &:hover {
    background: #3BB5A2;
  }

  svg {
    margin-right: var(--spacing-sm);
  }
`;

// 記事詳細ページコンポーネント
const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // ローカルストレージから記事データを取得
    const localArticles = localStorage.getItem('articles');
    const parsedLocalArticles = localArticles ? JSON.parse(localArticles) : [];
    
    // デフォルトの記事データとローカルストレージのデータを結合
    const allArticles = [...defaultArticles, ...parsedLocalArticles];
    
    // URLのスラッグに一致する記事を検索
    const foundArticle = allArticles.find(a => a.slug === slug);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // 関連記事の取得
      let related = [];
      if (foundArticle.relatedArticles) {
        related = allArticles.filter(a => 
          foundArticle.relatedArticles.includes(a.id) && a.id !== foundArticle.id
        ).slice(0, 3);
      } else {
        // 関連記事が指定されていない場合は同じカテゴリの記事を表示
        related = allArticles.filter(a => 
          a.category === foundArticle.category && a.id !== foundArticle.id
        ).slice(0, 3);
      }
      
      setRelatedArticles(related);
    } else {
      // 記事が見つからない場合は404ページに移動
      navigate('/not-found', { replace: true });
    }
    
    setLoading(false);
  }, [slug, navigate]);
  
  if (!article) {
    if (loading) {
      return (
        <PageContainer>
          <Container style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>記事を読み込んでいます...</p>
          </Container>
        </PageContainer>
      );
    }
    
    return (
      <PageContainer>
        <Container style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>記事が見つかりませんでした。</p>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ArticleHeader>
        <Container>
          <ArticleMeta>
            <ArticleDate>{article.date}</ArticleDate>
            <ArticleCategory>{article.category}</ArticleCategory>
          </ArticleMeta>
          <ArticleTitle>{article.title}</ArticleTitle>
        </Container>
      </ArticleHeader>
      
      <MainContent>
        <Container>
          <BackToArticles to="/articles">記事一覧に戻る</BackToArticles>
          
          {article.image && (
            <ArticleImage>
              <img src={article.image} alt={article.title} />
            </ArticleImage>
          )}
          
          {article.source && (
            <SourceCitation>
              <SourceTitle>引用元</SourceTitle>
              <SourceInfo>
                <SourceIcon type={article.source.type} />
                {article.source.type === 'note' && 'note記事: '}
                {article.source.author}・{article.source.publishedAt}公開
              </SourceInfo>
              <SourceLink 
                href={article.source.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                元記事を読む →
              </SourceLink>
            </SourceCitation>
          )}
          
          <ArticleContent dangerouslySetInnerHTML={{ __html: article.content }} />
          
          {article.source && (
            <SourceCitation>
              <SourceTitle>この記事について</SourceTitle>
              <SourceInfo>
                この記事は<SourceIcon type={article.source.type} />{article.source.type === 'note' && 'note'}で公開された
                {article.source.author}さんの記事を元に、許可を得て引用・再編集したものです。
              </SourceInfo>
              <SourceLink 
                href={article.source.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                元記事を読む →
              </SourceLink>
            </SourceCitation>
          )}
          
          {article.noteUrl && (
            <NoteButton href={article.noteUrl} target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z" fill="currentColor"/>
              </svg>
              note記事を読む
            </NoteButton>
          )}
          
          <ShareSection>
            <ShareTitle>この記事をシェアする</ShareTitle>
            <ShareButtons>
              <ShareButton href="#" title="Twitterでシェア">𝕏</ShareButton>
              <ShareButton href="#" title="Facebookでシェア">f</ShareButton>
              <ShareButton href="#" title="LINEでシェア">L</ShareButton>
              <ShareButton href="#" title="メールで送る">✉</ShareButton>
            </ShareButtons>
          </ShareSection>
          
          {relatedArticles.length > 0 && (
            <RelatedSection>
              <RelatedTitle>関連記事</RelatedTitle>
              <RelatedGrid>
                {relatedArticles.map(related => (
                  <RelatedCard key={related.id}>
                    <RelatedImage>
                      <img src={related.image} alt={related.title} />
                    </RelatedImage>
                    <RelatedContent>
                      <RelatedArticleTitle>
                        <Link to={`/articles/${related.slug}`}>{related.title}</Link>
                      </RelatedArticleTitle>
                    </RelatedContent>
                  </RelatedCard>
                ))}
              </RelatedGrid>
            </RelatedSection>
          )}
          
          <CTASection>
            <CTATitle>AIに関するお役立ち情報をLINEでお届け</CTATitle>
            <CTAText>友だち追加で最新情報やオリジナルコンテンツを受け取れます</CTAText>
            <CTAButton 
              href="https://lin.ee/your-line-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINE で友だち追加
            </CTAButton>
          </CTASection>
        </Container>
      </MainContent>
    </PageContainer>
  );
};

export default ArticleDetail; 