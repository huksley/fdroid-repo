import * as Lint from 'tslint'
import * as ts from 'typescript'

/**
 * Checks import definitions
 */
export class NoImportWalker extends Lint.RuleWalker {
  private matcher: (path: string) => boolean
  private failureString: string

  constructor(
    matcher: (path: string) => boolean,
    failureString: string,
    sourceFile: ts.SourceFile,
    options: Lint.IOptions,
  ) {
    super(sourceFile, options)
    this.matcher = matcher
    this.failureString = failureString
  }
  public visitImportDeclaration(node: ts.ImportDeclaration) {
    if (this.matcher(node.moduleSpecifier.getText())) {
      this.addFailure(this.createFailure(node.getStart(), node.getWidth(), this.failureString))
    }
    super.visitImportDeclaration(node)
  }
}
