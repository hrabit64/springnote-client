<template>
  <v-container class="d-flex justify-center align-center" width="100%">
    <v-row justify="center" align="center" class="mx-5">
      <v-col cols="12">
        <v-timeline align="start">
          <v-timeline-item>
            <template v-slot:opposite> Opposite content </template>
            <div>
              <div class="text-h6">Content title</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <template v-slot:opposite> Opposite content </template>
            <div>
              <div class="text-h6">Content title</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <template v-slot:opposite> Opposite content </template>
            <div>
              <div class="text-h6">Content title</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>

<style></style>
