import React from 'react';

export const EmptyPage = () => {
    return (
        <div className="icon-row-item mb-4">
            <div className="text-center">
                <img src="/assets/img/icon/box.webp" alt="thumbnail" className="empty-box mb-4" />
                <p className="lead text-center text-primary">No Data Available</p>
            </div>
        </div>
    );
};