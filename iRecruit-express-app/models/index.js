import { User } from './user.js';
import { Post } from './post.js';
import { Application } from './application.js';

User.hasMany(Post, { as: 'Posts', foreignKey: 'userId' });
Post.belongsTo(User, { as: 'User', foreignKey: 'userId' });
Application.belongsTo(User, { as: 'User', foreignKey: 'userId' });
Application.belongsTo(Post, { as: 'Post', foreignKey: 'jobId' });

export { User, Post };