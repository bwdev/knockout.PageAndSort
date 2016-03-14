function PagerViewModel(resourceUrl) {
    var self = this;
    self.Data = ko.observableArray([]);
    self.DefaultPageSize = ko.observable(100);
    self.NumberOfViewablePages = ko.observable(3);
    self.DataCount = ko.observable(0);
    self.PageIndex = ko.observable(0);
    self.PageSize = ko.observable(self.DefaultPageSize());
    self.ResourceUrl = ko.observable(resourceUrl);

    self.SortKey = ko.observable(null);
    self.SortColumn = function (obj) {
        console.log($(this));
    }

    self.ServiceEndpoint = ko.computed(function () {
        return self.ResourceUrl() + "?page=" + String(self.PageIndex() + 1) + "&pagesize=" + String(self.PageSize()) + "&sortkey=" + self.SortKey();

        //sortkey?
        //sortasc
    });

    self.ChunkedPages = ko.observableArray([]);
    self.ChunkData = function () {
        for (var i = 0; i <= self.MaxPage() ; i++) {
            var endpoint = self.ResourceUrl() + "?page=" + String(i) + "&pagesize=" + String(self.PageSize());

            $.getJSON(endpoint, function (data) {
                self.ChunkedPages.push({ "page": data.page, "data": data.data });
            });
        }
    }

    self.GetData = function () {
        var chunk = ko.utils.arrayFirst(self.ChunkedPages(), function (item) {
            return item.page === self.PageIndex() + 1;
        });

        if (chunk != null) {
            console.log(chunk.data);
            self.Data(chunk.data);
        }
        else {
            $.getJSON(self.ServiceEndpoint(), function (data) {
                self.DataCount(data.count);
                self.Data(data.data);
                self.ChunkedPages.push({ "page": self.PageIndex() + 1, "data": data.data });
                if (self.ChunkedPages().length === 1) self.ChunkData();
                Object.keys(data.data).forEach(function (key, index) {
                    // key: the name of the object key
                    // index: the ordinal position of the key within the object 
                    console.log(key + '  ' + String(index));
                });
            });
        }
    }

    self.MaxPage = ko.computed(function () {
        return Math.floor(self.DataCount() / self.PageSize());
    });

    self.FirstPage = function () {
        self.PageIndex(0);
        self.GetData();
    };

    self.PreviousPage = function () {
        if (self.PageIndex() < 1) return;
        self.PageIndex(self.PageIndex() - 1);
        self.GetData();
    };

    self.NextPage = function () {
        if (self.PageIndex() + 1 === self.MaxPage()) return;
        self.PageIndex(self.PageIndex() + 1);
        self.GetData();
    };

    self.SelectPage = function (page) {
        self.PageIndex(page - 1);
        self.GetData();
    };

    self.LastPage = function () {
        if (self.PageIndex() + 1 === self.MaxPage()) return;
        self.PageIndex(self.MaxPage() - 1);
        self.GetData();
    };

    self.ViewablePages = ko.computed(function () {
        var pages = [];
        if (self.PageIndex() - 2 >= 0) pages.push(self.PageIndex() - 1);
        if (self.PageIndex() - 1 >= 0) pages.push(self.PageIndex());

        if ((self.PageIndex() + 1) <= self.MaxPage()) pages.push(self.PageIndex() + 1);
        if ((self.PageIndex() + 2) <= self.MaxPage()) pages.push(self.PageIndex() + 2);
        if ((self.PageIndex() + 3) <= self.MaxPage()) pages.push(self.PageIndex() + 3);
        return pages;
    });

    self.TotalPages = ko.computed(function () {
        var nums = Math.floor(self.DataCount() / self.PageSize());
        var pages = [];

        for (var i = 0; i < nums; i++) {
            pages.push(i + 1);
        }

        return pages;
    });
}