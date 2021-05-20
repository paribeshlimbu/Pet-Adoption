'use strict';
// Node imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId; 
// Generates slugs for Advert model
const URLSlugs = require('mongoose-url-slugs');

/**
* Advert in the database
*/
const AdvertSchema = new Schema(
    {  
        name: { type: String, required: true, max: 40, index: true },
        // SEO Friendly slug
        slug: { type: String, slug: 'name', unique: true },
        description: { type: String, max: 150, required: true},
        price: { type: Number, required: true },
        type: { type: String, enum: ['buy', 'sell'], required: true, index: true },
        photo: { type: String, required: true },
        // Thumbnail
        thumbnail: { type: String, required: true },
        tags: [{ type: String, enum: ['dogs', 'cats', 'bulldog', 'german', 'husky', 'hound', 'akitas'], index: true},],
        // Booked pet true/false
        booked: { type: Boolean, default: false },
        // Sold pet true/false
        sold: { type: Boolean, default: false },
        // User
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    },
    {
        /**
        */
        timestamps: true,
    }    
);

/**
* @param {String} name 
* @param {String} venta 
* @param {String} tag 
* @param {String} precio 
* @param {String} user 
* @param {String} limit 
* @param {String} skip 
* @param {String} fields 
* @param {String} sort 
* @param {function} callback 
*/
AdvertSchema.statics.list = (name, venta, tag, precio, user, limit, skip, fields, sort, soldHistory) => {
    return new Promise((resolve, reject) => {
        // 
        let filter = {}
        if (name) filter.name = { '$regex': name, '$options': 'i' };
        if (venta) filter.type = venta==='true'?'sell':'buy';
        if (tag) filter.tags = tag.toLowerCase();
        if (precio) {
            let aux = precio.split('-');
            if (aux.length === 2) {
                if(aux[0]==='') {
                    filter.price = {'$lte': aux[1]};
                } else if(aux[1]==='') {
                    filter.price = {'$gte': aux[0]};
                } else {
                    filter.price = {'$gte': aux[0], '$lte': aux[1]};
                }
            }
        }
        filter.sold = false;
        if (user) filter.user = new ObjectId(user);
       
        if (soldHistory) filter = {sold: true, user: new ObjectId(soldHistory._id)}
        
        let queryDB = Advert.find(filter);
        limit = limit || parseInt(process.env.MAX_API_ADVERTS);
        skip = skip || 0;
        queryDB.limit(limit);
        queryDB.skip(skip);
        queryDB.select(fields);
        
        if (sort) {       
            let aux = sort.split('-');
            if (aux.length === 2) {
                let sort = {};
                sort[aux[0]] = '-1';
                queryDB.sort(sort);
            } else {
                
                queryDB.sort(sort);
            }
        } else {
            
            queryDB.sort({createdAt: -1});
        }

        queryDB.populate('user', '_id login name email avatar').exec()
        .then (results => {
            Advert.find(filter).countDocuments()
            .then(count => resolve({
                start: skip,
                end: skip + results.length,
                totalCount: count, 
                results 
            }))
            .catch(error => reject(error));
        })
        .catch (error => reject(error));
    });
}

/**

*/
AdvertSchema.statics.deleteAll = async function() {
    return await Advert.deleteMany({});
};

/**

*/
AdvertSchema.statics.insertAll = async function(adverts) {
    return await Advert.insertMany(adverts);
};

/**

* @param {String} id 
* @param {Advert} newAdvert 
*/
AdvertSchema.statics.updateAdvert = async function(id, newAdvert) {
    try {
        // 
        let advert = await Advert.findById(id);
        if (advert) {
            // 
            advert.name = newAdvert.name || advert.name;
            advert.price = newAdvert.price || advert.price;
            advert.type = newAdvert.type || advert.type;
            if (newAdvert.photo) {
                advert.photo = newAdvert.photo;
                advert.thumbnail = newAdvert.photo;
            } else {
                advert.photo = newAdvert.photo || advert.photo;
                advert.thumbnail = newAdvert.thumbnail || advert.thumbnail;
            }
            advert.tags = newAdvert.tags || advert.tags;
            advert.description = newAdvert.description || advert.description;
            advert.booked = newAdvert.booked;
            advert.sold = newAdvert.sold;
            // 
            return advert.save();
        }
        return false;
    } catch (error) {
        return error;
    }
};

/**
* @param {String} id 
* @param {String} thumbnail 
*/
AdvertSchema.statics.udpateThumbnail = async function(id, thumbnail) {   
    return Advert.updateOne({ _id: ObjectId(id)}, { $set: { 'thumbnail': thumbnail}})
};

AdvertSchema.post('save', (doc, next) => doc.populate('user', '_id login name email avatar').execPopulate(()=>next()));

AdvertSchema.index({ types: 1, tags: 1 });
AdvertSchema.index({ createdAt: -1 });

AdvertSchema.plugin(URLSlugs('name', { maxLength: 80 }));

const Advert = mongoose.model('Advert', AdvertSchema);

module.exports = Advert;