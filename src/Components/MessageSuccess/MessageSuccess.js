import * as React from 'react';

const MessageSuccess = ({ purchaseID }) => {
	return (
		<div className="alert alert-success d-flex align-items-center" role="alert">
				Thanks for your purchase! your transaction id is: {purchaseID}
		</div>
	);
};

export default MessageSuccess;
