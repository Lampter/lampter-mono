import React from "react";
import { useMutation, MutationHookOptions } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { PayloadAC, ActionType } from "typesafe-actions";
import { ApolloError } from "apollo-boost";

type AllowedAsyncActions<TData> = {
  request: PayloadAC<string, void>;
  success: PayloadAC<string, TData>;
  failure: PayloadAC<string, ApolloError>;
};

const useMutationWithAsyncDispatch = <TData, TVariables>(
  dispatch: React.Dispatch<ActionType<any>>,
  actions: AllowedAsyncActions<TData>,
  mutationQuery: DocumentNode,
  options: MutationHookOptions<TData, TVariables> = {}
) => {
  const { onCompleted, onError, ...rest } = options;
  const [mutationHandler] = useMutation<TData, TVariables>(mutationQuery, {
    onCompleted: data => {
      dispatch(actions.success(data));
      onCompleted && onCompleted(data);
    },
    onError: error => {
      dispatch(actions.failure(error));
      onError && onError(error);
    },
    ...rest
  });

  const decoratedMutationHandler: typeof mutationHandler = (...args) => {
    dispatch(actions.request());
    return mutationHandler(...args);
  };

  return [decoratedMutationHandler];
};

export default useMutationWithAsyncDispatch;
