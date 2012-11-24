gitPage.models.tagsModel = {
    tags:{},

    addTag:function (tag) {
        if (!this.tags[tag]) {
            this.tags[tag] = 1;
        } else {
            this.tags[tag]++;
        }
    }
};