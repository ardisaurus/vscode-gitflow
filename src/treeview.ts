import * as vscode from "vscode";
import * as path from "path";

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
      new TreeItem("Feature", "feature", {
        light: path.join(
          __filename,
          "..",
          "..",
          "..",
          "res",
          "light",
          "feature.svg"
        ),
        dark: path.join(
          __filename,
          "..",
          "..",
          "..",
          "res",
          "dark",
          "feature.svg"
        )
      }),
      new TreeItem("Bugfix", "bugfix", {
        light: path.join(
          __filename,
          "..",
          "..",
          "..",
          "res",
          "light",
          "bugfix.svg"
        ),
        dark: path.join(
          __filename,
          "..",
          "..",
          "..",
          "res",
          "dark",
          "bugfix.svg"
        )
      }),
      new TreeItem("Release", "release", {
        light: path.join(
          __filename,
          "..",
          "..",
          "..",
          "res",
          "light",
          "release.svg"
        ),
        dark: path.join(
          __filename,
          "..",
          "..",
          "..",
          "res",
          "dark",
          "release.svg"
        )
      }),
      new TreeItem("Hotfix", "hotfix", {
        light: path.join(
          __filename,
          "..",
          "..",
          "..",
          "res",
          "light",
          "hotfix.svg"
        ),
        dark: path.join(
          __filename,
          "..",
          "..",
          "..",
          "res",
          "dark",
          "hotfix.svg"
        )
      })
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

  constructor(
    label: string,
    contextValue: string,
    iconPath?: { light: string; dark: string }
  ) {
    super(label);
    this.contextValue = contextValue;
    this.iconPath = iconPath;
  }
}
