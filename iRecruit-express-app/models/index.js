import { User } from './user.js';
import { Post } from './post.js';
import { Application } from './application.js';

User.hasMany(Post, { as: 'posts', foreignKey: 'userId' });
Post.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Application.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Application.belongsTo(Post, { as: 'post', foreignKey: 'jobId' });

export { User, Post, Application };