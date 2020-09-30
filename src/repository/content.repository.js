const { Contents } = require('../models');

class ContentRepository  extends Contents{

    async findOne(id) {
        try {
            const user = await this.findOne({ id });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async create(user) {
        try {
            const result = await this.create(user);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(id, user) {
        try {
            const result = await this.updateOne({ id }, user);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            const result = await this.updateOne({ id }, { is_deleted: true });
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ContentRepository;