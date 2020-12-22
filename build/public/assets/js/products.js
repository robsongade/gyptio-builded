
window.contentPath = '/kendo-ui/content/mobile/apps/sushi';
$(document).ready(function () {
    
});

loadKendoProducts = ()=>{
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                dataType: "json",
                url: window.contentPath + "/menu.json"
            }
        },
        pageSize: 4,
        schema: {
            model: {
                fields: {
                    name: { type: "string" },
                    price: { type: "number" },
                    image: { type: "string" },
                    category: { type: "string" },
                    description: { type: "string" },
                    featured: { type: "boolean" }
                }
            }
        }
    });

    $("#filter").kendoFilter({
        dataSource: dataSource,
        expressionPreview: true,
        applyButton: true,
        fields: [
            { name: "name", type: "string", label: "Name" },
            { name: "price", type: "number", label: "Price" },
            { name: "description", type: "string", label: "Description" }
        ],
        expression: {
            logic: "or",
            filters: [
                { field: "price", value: 5, operator: "gte" },
                { field: "name", value: "salad", operator: "contains" }
            ]
        }
    }).data("kendoFilter").applyFilter();

    $("#listView").kendoListView({
        dataSource: dataSource,
        template: kendo.template($("#item").html())
    });

    $("#pager").kendoPager({
        dataSource: dataSource,
        responsive: false
    });
}