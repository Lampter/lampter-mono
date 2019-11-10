/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Issues
// ====================================================

export interface Issues_issues {
  __typename: "Issue";
  /**
   * Id of the issue.
   */
  id: number;
  /**
   * Title of the issue.
   */
  title: string;
  /**
   * Body of the issue.
   */
  body: string;
}

export interface Issues {
  issues: Issues_issues[];
}
