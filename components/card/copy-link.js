import { memo, useState } from 'react';
import { LinkIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const NotificationSuccess = dynamic(() => import('../notifications/success'));

function CopyLink({ content }) {
  const [showNotification, setShowNotification] = useState(false);

  let url = '';
  if (content.ContentType === 'Playlist') {
    url = `${process.env.HOME_URL}/library/${content?.PlaylistID}/video/${content?.SK}`;
  } else if (content?.ContentType === 'newsletters') {
    url = `${process.env.HOME_URL}/newsletters/${content?.SK}`;
  } else {
    url = `${process.env.HOME_URL}/library/${content?.ContentType}/${content?.SK}`;
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
        onClick={() => {
          navigator.clipboard.writeText(url?url : "");
          setShowNotification(true);
        }}
      >
        <LinkIcon className="h-5 w-5" aria-hidden="true" />
        <span className="font-medium">Link</span>
      </button>

      <NotificationSuccess
        type="link"
        show={showNotification}
        setShow={setShowNotification}
        text="Link copied successfully"
        subText={`The link to: ${content.Title} was copied to the clipboard.`}
      />
    </>
  );
}

CopyLink.propTypes = {
  content: PropTypes.object.isRequired
};

export default memo(CopyLink);
