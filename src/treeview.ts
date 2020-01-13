import * as vscode from "vscode";

export function buildTreeView(context: vscode.ExtensionContext) {
  const treeProvider = new ExampleTreeProvider();
  vscode.window.registerTreeDataProvider(
    "gitflowActionsTreeview",
    treeProvider
  );
  return treeProvider;
}

export class ExampleTreeProvider
  implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(
    element: vscode.TreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  onDidChangeTreeData?: vscode.Event<TreeItem | null | undefined> | undefined;

  data: TreeItem[];

  constructor() {
    this.data = [
      new TreeItem("Feature", "feature"),
      new TreeItem("Bugfix", "bugfix"),
      new TreeItem("Release", "release"),
      new TreeItem("Hotfix", "hotfix")
    ];
  }

  getChildren(element?: TreeItem): vscode.ProviderResult<TreeItem[]> {
    if (element === undefined) {
      return [...this.data];
    }
    return element.children;
  }
}

class TreeItem extends vscode.TreeItem {
  children: TreeItem[] | undefined;

  constructor(label: string, contextValue: string, children?: TreeItem[]) {
    super(
      label,
      children === undefined
        ? vscode.TreeItemCollapsibleState.None
        : vscode.TreeItemCollapsibleState.Expanded
    );
    this.contextValue = contextValue;
    this.children = children;
  }
}
