var setting = {
    check: {
        enable: true,
        chkboxType: { "Y": "", "N": "" }
    },
    callback: {
        // onCheck: function(event, treeId, treeNode) {
        //     console.log(JSON.stringify(treeNode, null, 2))
        // }
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};

var zNodes = [{
    id: 's1',
    pId: 0,
    name: "随意勾选 1",
    open: true,
    type: 'groups'
}, {
    id: 11,
    pId: 's1',
    name: "随意勾选 1-1",
    open: true
}, {
    id: 111,
    pId: 11,
    name: "随意勾选 1-1-1",
    type: 'groups'
}, {
    id: 112,
    pId: 11,
    name: "随意勾选 1-1-2"
}, {
    id: 12,
    pId: 's1',
    name: "随意勾选 1-2",
    open: true
}, {
    id: 121,
    pId: 12,
    name: "随意勾选 1-2-1"
}, {
    id: 122,
    pId: 12,
    name: "随意勾选 1-2-2"
}, {
    id: 2,
    pId: 0,
    name: "随意勾选 2",
    checked: true,
    open: true
}, {
    id: 21,
    pId: 2,
    name: "随意勾选 2-1"
}, {
    id: 22,
    pId: 2,
    name: "随意勾选 2-2",
    open: true
}, {
    id: 221,
    pId: 22,
    name: "随意勾选 2-2-1",
    checked: true
}, {
    id: 222,
    pId: 22,
    name: "随意勾选 2-2-2"
}, {
    id: 23,
    pId: 2,
    name: "随意勾选 2-3"
}];

var code;

function setCheck() {
    // var zTree = $.fn.zTree.getZTreeObj("treeDemo"),

}

function showCode(str) {
    if (!code) code = $("#code");
    code.empty();
    code.append("<li>" + str + "</li>");
}

$(document).ready(function() {
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    // setCheck();
    // $("#py").bind("change", setCheck);
    // $("#sy").bind("change", setCheck);
    // $("#pn").bind("change", setCheck);
    // $("#sn").bind("change", setCheck);
});

// 测试获得全部被选中的 check
function getCheckedNodes() {
    console.log('点击')
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    // console.log(JSON.stringify(nodes, null, 2))
    nodes.forEach(function(element) {
        console.log(element.id)
    }, this);

}
/**
 * 测试  设置checkbox 被选中
 * 
 */
function setCheckednodes() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getNodesByParam("id", "s1", null);
    // var nodes = treeObj.getNodes();
    if (nodes.length > 0) {
        treeObj.checkNode(nodes[0], true, false);
    }
}


function cancelAllcheckbox() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    treeObj.checkAllNodes(false);
}