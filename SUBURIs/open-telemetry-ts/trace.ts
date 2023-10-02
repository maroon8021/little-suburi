import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
