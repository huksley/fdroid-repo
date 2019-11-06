import * as Lint from 'tslint'
import * as ts from 'typescript'

export class TransitiveImportWalker extends Lint.RuleWalker {
  private dependencies: string[]
  private failureString: string

  constructor(
    dependencies: string[],
    failureString: string,
    sourceFile: ts.SourceFile,
    options: Lint.IOptions,
  ) {
    super(sourceFile, options)
    this.dependencies = dependencies
    this.failureString = failureString
  }
  public visitImportDeclaration(node: ts.ImportDeclaration) {
    let dep = node.moduleSpecifier.getText()
    if (dep.startsWith("'")) {
      dep = dep.substring(1, dep.length - 1)
    }

    if (dep.startsWith('../') || dep.startsWith('./')) {
      // Local
    } else {
      // Remove subpart of package, like uuid/v4
      if (dep.indexOf('/') > 0) {
        dep = dep.substring(0, dep.indexOf('/'))
      }
      if (this.dependencies.indexOf(dep) < 0) {
        this.addFailure(
          this.createFailure(node.getStart(), node.getWidth(), this.failureString + ': ' + dep),
        )
      }
    }
    super.visitImportDeclaration(node)
  }
}

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'using transitive dependencies are forbidden'

  public getDependencies() {
    const j = require('../package.json')
    return Object.keys(j.dependencies).concat([
      // System and provided packages
      'url',
      'fs',
      'tslint',
      'typescript',
    ])
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new TransitiveImportWalker(
        this.getDependencies(),
        Rule.FAILURE_STRING,
        sourceFile,
        this.getOptions(),
      ),
    )
  }
}
