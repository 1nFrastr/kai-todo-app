import { useTranslation } from 'react-i18next';
import './PostApp.scss';

const PostApp: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="post-app">
      <div className="coming-soon">
        <div className="icon">🚧</div>
        <h2>{t('navigation.postApp', 'Post App')}</h2>
        <p>{t('navigation.comingSoon', 'Coming Soon')}</p>
        <div className="description">
          <p>{t('postApp.description', 'This feature is under development. It will allow you to create and publish content with AI assistance.')}</p>
        </div>
      </div>
    </div>
  );
};

export default PostApp;
